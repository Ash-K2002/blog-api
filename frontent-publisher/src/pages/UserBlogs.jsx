import Blogs from '../components/Blogs';

function UserBlogs(){
    return(
        <>
        <section className='p-2 my-2'>
        <h2 className='text-customCool-dark font-bold text-2xl'>Published Blogs </h2>
        
            <Blogs published={true}/>
        </section>
        <section className='p-2 my-2'>
        <h2 className='text-customCool-dark font-bold text-2xl'>Unpublished Blogs </h2>
        
            <Blogs published={false}/>
        </section>
        </>
    );
}

export default UserBlogs;