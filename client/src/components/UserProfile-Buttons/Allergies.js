import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.css';

function Allergies() {

    const commonFoodAllergies = ["Peanuts", "Tree Nuts", "Milk", "Eggs", "Soy", "Wheat", "Fish", "Shellfish",
                                        "Sesame", "Mustard", "Celery", "Corn", "Avocado", "Meat", "Garlic",
                                        "Stone Fruits", "Kiwi", "Papaya", "Rice", "Lupin"];

    const [userAllergies, setUserAllergies] = useState([]);
    const [inputValueSearch, setInputValueSearch] = useState('');

    const [allAllergies, setAllAllergies] = useState(commonFoodAllergies);
    const [searchAllergies, setSearchAllergies] = useState(commonFoodAllergies);

    let search = '';

    // adds allergy to user
    const handleAddUserAllergy = (item) => {
        if (!userAllergies.includes(item)) {
            let sev = prompt("allergy severity 1-10")
            setUserAllergies([...userAllergies, [item, sev]]);
        } else {
            alert(`Allergy "${item}" already added.`);
        }
        setInputValueSearch('');
        updateSearch([...userAllergies, item]);
    };

    // removes allergy from user
    const handleRemoveAllergy = (index) => {
        const updatedItems = [...userAllergies];
        updatedItems.splice(index, 1);
        setUserAllergies(updatedItems);
        setInputValueSearch('');
        updateSearch(updatedItems);
    };

    const handleSearchChange = (e) => {
        setInputValueSearch(e.target.value);
        search = e.target.value;
        updateSearch();
    }


    const updateSearch = (allergies = userAllergies) => {
        if (search.trim() !== '') {
            const filteredAllergies1 = allAllergies.filter(allergy =>
                allergy.toLowerCase().includes(search.toLowerCase())
            );
            const filteredAllergies2 = filteredAllergies1.filter(allergy =>
                !allergies.some(existingAllergy => existingAllergy[0].toLowerCase() === allergy.toLowerCase())
            );
            setSearchAllergies(filteredAllergies2);
        } else {
            const filteredAllergies2 = allAllergies.filter(allergy =>
                !allergies.includes(allergy));
            setSearchAllergies(filteredAllergies2);
        }
    };


    return (
        <div className="m-4 p-4">
            <h2>Your Allergies</h2>

            {userAllergies.map((item, index) => (
                //stack shows users allergies
                <Stack
                    key={index}
                    direction="horizontal"
                    gap={3}
                    className="mb-2 p-2 border rounded border-danger"
                    varient="outline-danger"
                >
                    <div className="p-2">{item[0]}</div>
                    <div className="p-2 ms-auto">{item[1]}</div>
                    <div className="p-2">
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemoveAllergy(index)}
                        >
                            Remove
                        </Button></div>
                </Stack>
            ))}
            <Stack
                direction="horizontal"
                gap={3}
                className="mb-2 p-2 "
                varient="outline-danger"
            >
                <div className="p-2"><h2>All Allergies</h2></div>
                <div className="p-2 "><Button
                    variant="outline-secondary"
                    onClick={() => alert('not added')}
                >
                    Create New Allergy
                </Button></div>
            </Stack>
            <Form.Control
                className="mb-4 p-2"
                placeholder="search"
                value={inputValueSearch}
                onChange={(e) => handleSearchChange(e)}
            />

            {searchAllergies.map((item, index) => (
                //stack shows all allergies
                <Stack
                    key={index}
                    direction="horizontal"
                    gap={3}
                    className="mb-2 p-2 border rounded"

                >
                    <div className="p-2">{item}</div>
                    <div className="p-2 ms-auto"><Button
                        variant="outline-primary"
                        onClick={() => handleAddUserAllergy(item)}
                    >
                        Add
                    </Button></div>
                </Stack>
            ))}

        </div>
    );
}

export default Allergies;
