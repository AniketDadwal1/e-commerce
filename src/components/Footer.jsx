import { useEffect, useState } from 'react';


export const Footer = () => {

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 900) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        }
    }, []);

    return (
        <div className='fondo fixed bottom-0 w-full'>
            <div className='flex justify-center items-center mt-2 cursor-pointer text-sm'>
                {isVisible && (
                    <div
                        onClick={() => scrollToTop()}
                    >
                        <p>Go to start</p>
                    </div>
                )}
            </div>
              <footer className='flex flex-col md:flex-row justify-between items-center py-4 px-4 sm:px-8 text-sm font-light border-t gap-2 md:gap-0 text-center md:text-left'>
                <p className='text-gray-700'>
                    AniStore — Bringing the best products to your doorstep 💚
                </p>
                <p className='text-gray-500'>
                    &copy; {new Date().getFullYear()} AniStore. All rights reserved.
                </p>
                </footer>



        </div>
    )
};