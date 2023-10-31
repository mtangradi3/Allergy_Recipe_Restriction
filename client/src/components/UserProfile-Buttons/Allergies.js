import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.css';
import { getAllAllergies, getUserAllergies, addNewAllergy } from "../../api/allergyAPI";
import {addUserAllergy, removeUserAllergy} from "../../api/userAPI";
import {useLocation} from "react-router-dom";




function Allergies() {
    const location = useLocation();
    const { firstName, lastName, email } = location.state || {};




    useEffect(() => {
        const fetchAllergies = async () => {
            try {
                const data = await getAllAllergies();
                setAllAllergies(data);
                setSearchAllergies(data);
                console.log(data);

            } catch (err) {
                console.log(err.message || "An error occurred while fetching Allergies.");
            }
        };

        const fetchUserAllergies = async (email) => {
            try {
                const data = await getUserAllergies(email);
                setUserAllergies(data);
                console.log(data);

            } catch (err) {
                console.log(err.message || "An error occurred while fetching User Allergies.");
            }
        };

        fetchAllergies();
        fetchUserAllergies(email);
    }, []);



    const [userAllergies, setUserAllergies] = useState([]);
    const [inputValueSearch, setInputValueSearch] = useState('');

    const [allAllergies, setAllAllergies] = useState([]);
    const [searchAllergies, setSearchAllergies] = useState([]);

    let search = '';

    // adds allergy to user
    const handleAddUserAllergy = (item) => {

        if (!userAllergies.includes(item)) {
            let sev = prompt("allergy severity 1-10")
            setUserAllergies([...userAllergies, item]);
            try {
                addUserAllergy(email,[item]).then(r => console.log(r))

            } catch (err) {
                console.log(err.message || "An error occurred while adding Allergies.");
            }



        } else {
            alert(`Allergy "${item}" already added.`);
        }
        setInputValueSearch('');
        updateSearch([...userAllergies, item]);
    };

    // removes allergy from user
    const handleRemoveAllergy = (index) => {
        const updatedItems = [...userAllergies];
        const removedItem = updatedItems[index];
        updatedItems.splice(index, 1);
        setUserAllergies(updatedItems);
        setInputValueSearch('');
        updateSearch(updatedItems);
        console.log(typeof removedItem);

        try {
            removeUserAllergy(removedItem, email).then(r => console.log(r));

        } catch (err) {
            console.log(err.message || "An error occurred while adding Allergies.");
        }

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

    const handleNewAllergy = () => {
        const item = prompt("Enter Allergy name");

        try {
            addNewAllergy(item).then(r => console.log(r))

        } catch (err) {
            console.log(err.message || "An error occurred while adding Allergies.");
        }


    }


    return (
        <div className="m-4 p-4">
            <h2>Your Allergies {email}</h2>

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
                    <div className="p-2 ms-auto">{}</div>
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
                    onClick={() => handleNewAllergy()}
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
