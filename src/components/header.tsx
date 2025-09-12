export default function Header() {
    return (
        <div className="px-8 py-4 lg:py-8 mt-8">
            <div className="max-w-4xl mx-auto">
                <img 
                    className="mx-auto max-w-[100px] h-auto"
                    src="icons/Sorializer.png" 
                />
                <h1 className="text-4xl font-semibold text-center mt-4">Sorializer</h1>
                <h1 className="text-2xl text-center italic">(Sorting Algorithm Visualizer)</h1>
                <p className="text-base md:text-center mt-6 text-justify">
                    Shows the step-by-step procedure of sorting algorithms through a clear and complete solution similar to a detailed notebook or mathematical proof.
                </p>
            </div>
        </div>
    )
}