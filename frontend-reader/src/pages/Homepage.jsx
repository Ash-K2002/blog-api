import Blogs from '../components/Blogs.jsx';
import HeroSection from '../components/HeroSection.jsx';

function HomePage(){
    return (
        <>  
        <HeroSection/>
        <section id='blog-links-section' className='px-5 py-2'>
        <h2 id='blog-links-heading' className='font-bold text-2xl text-customGray-light mb-4 '>Blogs</h2>
        <Blogs/>
        </section>
        
        </>
    );
}

export default HomePage;