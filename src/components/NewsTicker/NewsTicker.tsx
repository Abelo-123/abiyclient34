import { useApp } from '../../context/AppContext';

export function NewsTicker() {
    const { marqueeText } = useApp();
    const textToDisplay = marqueeText || 'Current Headlines Ensmuited Pillars Cooperation • Fast & Secure Social Media Services';

    return (
        <div className="news-ticker">
            <span className="news-ticker__badge">NEWS</span>
            <div className="news-ticker__text-wrapper">
                <span className="news-ticker__text">{textToDisplay}</span>
            </div>
        </div>
    );
}
