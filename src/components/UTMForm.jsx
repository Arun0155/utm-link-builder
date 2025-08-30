import { useState } from "react";
import OutputLink from "./OutputLink";

function UTMForm() {
    const [formData, setFormData] = useState({
    baseUrl: "",
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: "",
    });

    const [utmUrl, setUtmUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

  // Handle input changes
    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  // Generate UTM URL
    const generateUTM = () => {
    if (!formData.baseUrl) {
        alert("Base URL is required!");
        return;
    }
    let url = `${formData.baseUrl}?utm_source=${formData.source}&utm_medium=${formData.medium}&utm_campaign=${formData.campaign}`;
    if (formData.term) url += `&utm_term=${formData.term}`;
    if (formData.content) url += `&utm_content=${formData.content}`;

    setUtmUrl(url);

    // Call Free URL Shortener API (shrtco.de)
    fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
        .then((res) => res.json())
        .then((data) => setShortUrl(data.result.full_short_link))
        .catch(() => setShortUrl("Error shortening URL"));
    };

    return (
    <div className="form-container">
        <input type="text" name="baseUrl" placeholder="Base URL" onChange={handleChange} />
        <input type="text" name="source" placeholder="Campaign Source (utm_source)" onChange={handleChange} />
        <input type="text" name="medium" placeholder="Campaign Medium (utm_medium)" onChange={handleChange} />
        <input type="text" name="campaign" placeholder="Campaign Name (utm_campaign)" onChange={handleChange} />
        <input type="text" name="term" placeholder="Campaign Term (optional)" onChange={handleChange} />
        <input type="text" name="content" placeholder="Campaign Content (optional)" onChange={handleChange} />

        <button onClick={generateUTM}>Generate UTM Link</button>

        {utmUrl && <OutputLink utmUrl={utmUrl} shortUrl={shortUrl} />}
    </div>
    );
}

export default UTMForm;
