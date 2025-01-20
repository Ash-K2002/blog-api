import Blogs from '../components/Blogs';

function UserBlogs(){
    return(
        <>
        <h2>Published Blogs: </h2>
        <section>
            <Blogs published={true}/>
        </section>
        <h2>Unpublished Blogs: </h2>
        <section>
            <Blogs published={false}/>
        </section>
        </>
    );
}

export default UserBlogs;