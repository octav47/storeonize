import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'storeonize/react-redux'
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit,
} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class AsyncApp extends Component {
  componentDidMount() {
    const { selectedSubreddit, fetchPostsIfNeeded } = this.props

    fetchPostsIfNeeded(selectedSubreddit)
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { selectedSubreddit, fetchPostsIfNeeded } = this.props

      fetchPostsIfNeeded(selectedSubreddit)
    }
  }

  handleChange = nextSubreddit => {
    const {
      selectedSubreddit,
      fetchPostsIfNeeded,
      selectSubreddit,
    } = this.props

    selectSubreddit(nextSubreddit)
    fetchPostsIfNeeded(selectedSubreddit)
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const {
      selectedSubreddit,
      fetchPostsIfNeeded,
      invalidateSubreddit,
    } = this.props

    invalidateSubreddit(selectedSubreddit)
    fetchPostsIfNeeded(selectedSubreddit)
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props

    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']}
        />
        <p>
          {lastUpdated && (
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
            </span>
          )}
        </p>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        )}
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  fetchPostsIfNeeded: PropTypes.func.isRequired,
  selectSubreddit: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const { selectedSubreddit, postsBySubreddit } = state
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || {
    isFetching: true,
    items: [],
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
  }
}

const mergeProps = (stateProps, { dispatch }) => {
  return {
    ...stateProps,
    fetchPostsIfNeeded: subreddit => dispatch(fetchPostsIfNeeded(subreddit)),
    selectSubreddit: subreddit => dispatch(selectSubreddit(subreddit)),
    invalidateSubreddit: subreddit => dispatch(invalidateSubreddit(subreddit)),
  }
}

export default connect(mapStateToProps, null, mergeProps)(AsyncApp)
