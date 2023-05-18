import React, {useState, useEffect} from 'react'
import {css} from '@emotion/react'

const styles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    width: 500px;
    margin: 40px auto;

    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    .blog-post {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-bottom: 20px;
    }

    .blog-post-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .blog-post-description {
        font-size: 16px;
        margin-bottom: 10px;
    }

    .blog-post-author {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .blog-post-author-picture {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .blog-post-picture {
        width: 100%;
        height: 200px;
        object-fit: cover;
        margin-bottom: 10px;
    }
    .blog-search {
        margin-bottom: 10px;
    }

    .blog-search input {
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
        max-width: 300px;
    }

    .blog-controls: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  .blog-sort: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  .blog-sort label: {
    marginRight: '0.5rem',
  },
  .blog-sort select: {
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    color: '#333',
    appearance: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
  },
`

const mockBlogPosts = [
    {
        title: 'Blog Post 1',
        description: 'This is the first blog post',
        author: {
            name: 'John Doe',
            picture: 'https://via.placeholder.com/50'
        },
        picture: 'https://via.placeholder.com/500x200',
        createdDate: new Date('2021-01-01')
    },
    {
        title: 'Blog Post 2',
        description: 'This is the second blog post',
        author: {
            name: 'Jane Doe',
            picture: 'https://via.placeholder.com/50'
        },
        picture: 'https://via.placeholder.com/500x200',
        createdDate: new Date('2021-01-02')
    }
]

const BlogPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredBlogPosts, setFilteredBlogPosts] = useState(mockBlogPosts)
    const [sortOrder, setSortOrder] = useState('desc')

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const filteredPosts = mockBlogPosts.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredBlogPosts(filteredPosts)
        }
    }

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value)
    }

    useEffect(() => {
        // setFilteredBlogPosts(mockBlogPosts)

        // const sortedPosts = mockBlogPosts.sort((a, b) => b.createdDate - a.createdDate)
        // setFilteredBlogPosts(sortedPosts)
        const sortedPosts = mockBlogPosts.sort((a, b) =>
            sortOrder === 'asc' ? b.createdDate - a.createdDate : a.createdDate - b.createdDate
        )
        setFilteredBlogPosts(sortedPosts)
    }, [sortOrder])

    return (
        <div css={styles}>
            <h1>Blog</h1>
            <div className="blog-controls">
                <div className="blog-search">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        onKeyPress={handleKeyPress}
                        placeholder="Search blog posts"
                    />
                </div>
                <div className="blog-sort">
                    <label htmlFor="sort-order">Sort by date:</label>
                    <select id="sort-order" value={sortOrder} onChange={handleSortOrderChange}>
                        <option value="desc">Newest first</option>
                        <option value="asc">Oldest first</option>
                    </select>
                </div>
            </div>
            {filteredBlogPosts.map((post) => (
                <div className="blog-post" key={post.title}>
                    <h2 className="blog-post-title">{post.title}</h2>
                    <p className="blog-post-description">{post.description}</p>
                    <div className="blog-post-author">
                        <img
                            className="blog-post-author-picture"
                            src={post.author.picture}
                            alt={post.author.name}
                        />
                        <span>{post.author.name}</span>
                    </div>
                    <img className="blog-post-picture" src={post.picture} alt={post.title} />
                </div>
            ))}
        </div>
    )
}

export default BlogPage
