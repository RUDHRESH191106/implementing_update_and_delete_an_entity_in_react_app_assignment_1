import { useState, useEffect } from "react";
import axios from "axios";

const UpdateItem = ({ itemId }) => {
    const API_URI = "https://your-api-url.com/items"; // Replace with actual API URL
    const [item, setItem] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [message, setMessage] = useState("");

    // Fetch the existing item when the component mounts
    useEffect(() => {
        axios.get(`${API_URI}/${itemId}`)
            .then(response => {
                setItem(response.data);
                setUpdatedName(response.data.name); // Assuming 'name' is a property of the item
            })
            .catch(error => setMessage("Error fetching item"));
    }, [itemId]);

    // Handle input change
    const handleChange = (event) => {
        setUpdatedName(event.target.value);
    };

    // Handle form submission to update the item
    const handleUpdate = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`${API_URI}/${itemId}`, {
                name: updatedName
            });
            setMessage("Item updated successfully!");
            setItem(response.data);
        } catch (error) {
            setMessage("Error updating item");
        }
    };

    return (
        <div>
            <h2>Update Item</h2>

            {item ? (
                <form onSubmit={handleUpdate}>
                    <label>Item Name:</label>
                    <input type="text" value={updatedName} onChange={handleChange} />
                    <button type="submit">Update</button>
                </form>
            ) : (
                <p>Loading item...</p>
            )}

            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateItem;


