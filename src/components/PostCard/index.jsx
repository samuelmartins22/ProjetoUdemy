import './styles.css';

export const PostCard = ({ title, cover, body, id }) => {
    return (
        <div className="post">
            <img src={cover} alt={title} />
            <div key={id} className="post-content">
                <h1>{title} {id}</h1>
                <p>{body}</p>
            </div>
        </div>
    );
}
