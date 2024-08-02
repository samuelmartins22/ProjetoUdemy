import { Component } from 'react';
import '../../components/posts/styles.css';
import { TextInput } from '../../components/TextInput/index.jsx';
import { Posts } from '../../components/posts/index.jsx';
import { loadPosts } from '../../utils/load-posts.js'
import { Button } from '../../components/Button/index.jsx';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  }

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage
      + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ searchValue: value });
  }

  render() {

    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      })
      : posts;

    return (
      <section className="container">

        <div className="search-container">
          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}

          { /*O TextInput estava como não definido,
        o problema foi resolvido importando o objeto
        aqui, falando em qual pasta ele tá e tal*/ }
          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && (
          <Posts post={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Tem posts não :(</p>
        )}

        <Posts posts={filteredPosts} />
        <div className='button-container'>
          {!searchValue && (
            <Button
              text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}

        </div>

      </section>
    );
  }
}


