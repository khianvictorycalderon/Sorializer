export default function Footer() {

    const date = new Date();
    const currentYear = date.getFullYear();
    
    return (
        <div className="px-8 py-4 lg:py-8">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row">
                
                <div className="flex-1/2 text-center md:text-left">
                    <img
                        className="max-h-[100px] max-w-[100px] mx-auto md:mx-0" 
                        src="icons/Khian_Icon_Logo.png"
                    />
                    <p>
                        Website Created by:     <br/>
                        <a 
                            href="https://khian.netlify.app/"
                            className="italic underline"
                            target="_blank"
                        >Khian Victory D. Calderon</a>
                    </p>
                </div>

                <div className="flex-1/2 md:text-right flex items-end justify-center md:justify-end mt-8 md:mt-0">
                    All rights reserved {currentYear}.
                </div>

            </div>
        </div>
    )
}