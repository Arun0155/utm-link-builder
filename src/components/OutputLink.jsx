
function OutputLink({ utmUrl, shortUrl }) {
    const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
    };

    return (
    <div className="output-container">
        <h3>Generated UTM Link:</h3>
        <input type="text" value={utmUrl} readOnly />
        <button onClick={() => copyToClipboard(utmUrl)}>Copy</button>

        {shortUrl && (
        <>
            <h3>Shortened Link:</h3>
            <input type="text" value={shortUrl} readOnly />
            <button onClick={() => copyToClipboard(shortUrl)}>Copy</button>
        </>
        )}
    </div>
    );
}

export default OutputLink;
