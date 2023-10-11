import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.css';

function Allergies() {


    const [userAllergies, setUserAllergies] = useState([]);
    const [inputValueSearch, setInputValueSearch] = useState('');

    const [allAllergies, setAllAllergies] = useState(['Peanuts', 'Tree Nuts', 'Milk', 'Eggs', 'Soy', 'Wheat', 'Fish', 'Shellfish', 'Sesame', 'Mustard']);
    const [searchAllergies, setSearchAllergies] = useState(['Peanuts', 'Tree Nuts', 'Milk', 'Eggs', 'Soy', 'Wheat', 'Fish', 'Shellfish', 'Sesame', 'Mustard']);

    let search = '';

    // adds allergy to user
    const handleAddUserAllergy = (item) => {
        if (!userAllergies.includes(item)) {
            setUserAllergies([...userAllergies, item]);
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
                !allergies.some(existingAllergy => existingAllergy.toLowerCase() === allergy.toLowerCase())
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
                    <div className="p-2">{item}</div>
                    <div className="p-2 ms-auto">severity</div>
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
            <h2>All Allergies</h2>
            <Form.Control
                className="p-2"
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
                    variant="border-danger"
                    onClick={() => handleAddUserAllergy(item)}
                >
                    <div className="p-2">{item}</div>
                </Stack>
            ))}

        </div>
    );
}

export default Allergies;
