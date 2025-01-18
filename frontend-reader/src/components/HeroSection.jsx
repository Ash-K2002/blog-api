import blogImage from '../assets/blgimg.jpg'

function HeroSection(){
return(
    <section id="hero-section" className='grid grid-cols-2 gap-5 p-5 bg-customGray-dark text-customBlue-medium'>
        <section id="hero-imageFrame" className='w-full h-auto'>
            <img src={blogImage} alt="blog-image" />
        </section>
        <section id='hero-text' className='flex flex-col justify-center gap-2'>
        <h2 className='text-3xl font-bold'>Welcome to my blog app</h2>
        <p className='font-semibold'>
        Dive into a world of captivating stories, insightful articles, and lively discussions. Explore blogs from various authors, share your thoughts in the comments, and join a community of curious minds. Your next favorite read is just a click away!
        </p>
        </section>

    </section>
);
}

export default HeroSection;