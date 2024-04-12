import React, { useEffect, useState } from 'react';
import PropertyDataMain from '../data/PropertyData.json';
import { AdvancedFilterComp, FavouriteItemContent, MainItemContent } from './Common';

function Home() {
    const [propertyData, setPropertyData] = useState(PropertyDataMain);
    // Load the favouriteList from localStorage on component mount
    const [favouriteList, setFavouriteList] = useState(() => {
        const storedFavourites = localStorage.getItem('favouriteList');
        return storedFavourites ? JSON.parse(storedFavourites) : [];
    });
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [advancedFilter, setAdvancedFilter] = useState({
        type: '',
        location: '',
        fromdate: '',
        todate: '',
    })



    // Save the favouriteList to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('favouriteList', JSON.stringify(favouriteList));
    }, [favouriteList]);

    const handleAddFavourite = (item) => {
        // Check if the item with the same id is already in the favouriteList
        const isDuplicate = favouriteList.some((favItem) => favItem.id === item.id);

        // If it's not a duplicate, add the item to the favouriteList
        if (!isDuplicate) {
            setFavouriteList((prev) => [item, ...prev]);
        } else {
            alert("Item already in favourites!");
        }
    };

    const handleRemoveFavourite = (item) => {
        // Filter out the item with the specified id
        const updatedFavouriteList = favouriteList.filter((prev) => prev.id !== item.id);

        // Update the favouriteList state with the filtered list
        setFavouriteList(updatedFavouriteList);
    };



    const handleDragStart = (event, item) => {
        // Attach the dragged item data to the drag event
        event.dataTransfer.setData('text/plain', JSON.stringify(item));
    };

    const handleDragOver = (event) => {
        // Prevent the default behavior to allow dropping
        event.preventDefault();
    };


    const handleDrop = (event, target) => {
        // Prevent the default behavior to avoid unwanted actions
        event.preventDefault();

        // Retrieve the dragged item data from the drag event
        const droppedItem = JSON.parse(event.dataTransfer.getData('text/plain'));

        // Check the target to determine the action
        if (target === 'favourite') {
            // Add the item to the favourite list
            handleAddFavourite(droppedItem)
        } else if (target === 'property') {
            handleRemoveFavourite(droppedItem)
            // Remove the item from the favourite list
        }
    };

    const handleSearch = (searchText) => {
        // If searchText is empty, show all properties
        if (!searchText.trim()) {
            setPropertyData(window.Properties || []);
            return;
        }

        // Convert both search text and property titles to lowercase for case-insensitive comparison
        const lowercaseSearchText = searchText.toLowerCase();

        // Filter the propertyData based on the case-insensitive search text
        const filtered = PropertyDataMain?.filter((item) =>
            item.title.toLowerCase().includes(lowercaseSearchText) || item.location.toLowerCase().includes(lowercaseSearchText) || item.title.toLowerCase().includes(lowercaseSearchText)
        );

        // Update the state with the filtered data
        setPropertyData(filtered);
    };

    const handleFilterChange = (e) => {
        setAdvancedFilter(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const resetFilter = () => {
        setAdvancedFilter({
            type: '',
            location: '',
            fromdate: '',
            todate: '',
        })
    }

    const handleFilterSearch = () => {
        // Filter properties based on advanced filter criteria
        const filteredProperties = PropertyDataMain?.filter((item) => {
            const isTypeMatch = !advancedFilter.type || item.type.toLowerCase() === advancedFilter.type.toLowerCase();
            const isLocationMatch = !advancedFilter.location || item.location.toLowerCase().includes(advancedFilter.location.toLowerCase());
            const isFromDateMatch = !advancedFilter.fromdate || new Date(item.date) >= new Date(advancedFilter.fromdate);
            const isToDateMatch = !advancedFilter.todate || new Date(item.date) <= new Date(advancedFilter.todate);

            return (
                isTypeMatch &&
                isLocationMatch &&
                isFromDateMatch &&
                isToDateMatch
            );
        });

        // Update the state with the filtered data
        setPropertyData(filteredProperties);
    };



    return (

        //Search Bar + Drag Drop feature
        <>
            <nav className='container-xl py-2'>
                <div className="border border-primary rounded-2 px-2">
                    <h2 className='mx-auto text-center'>MealMap</h2>
                </div>
            </nav>

            
            <div className='container-xl pb-4'>
                <div className="row gy-3">
                    <div className="col-md-7 col-lg-9"
                        onDragOver={(event) => handleDragOver(event)}
                        onDrop={(event) => handleDrop(event, 'property')}
                    >

                        <div className="bg-info bg-opacity-25 rounded-2 shadow-sm mb-3 transition">
                            <div onClick={() => setShowAdvanced(!showAdvanced)} className='text-center user-select-none py-2 fw-medium cursor-pointer text-primary text-opacity-75'>{showAdvanced ? 'Hide' : 'Show'} Advanced Search</div>
                            {showAdvanced &&
                                <AdvancedFilterComp {...{ handleFilterChange, advancedFilter, handleFilterSearch, resetFilter }} />
                            }
                        </div>

                        <div className="row g-2 bg-primary bg-opacity-10  rounded-2">
                            {propertyData.length > 0 && propertyData?.map((item, index) => {
                                return (
                                    <div key={index} className="col-sm-6 col-lg-4"

                                    >
                                        <div className="bg-white rounded-3 border shadow-sm h-100 overflow-hidden cursor-move"
                                            draggable
                                            onDragStart={(event) => handleDragStart(event, item)}
                                        >
                                            <div className='d-flex flex-column'>
                                                <MainItemContent item={item} />
                                                <button onClick={() => handleAddFavourite(item)} className='btn btn-sm btn-primary m-2 mt-0'>Add to Favourite</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-md-5 col-lg-3 bg-warning bg-opacity-25 rounded-2 pb-2"
                        onDragOver={(event) => handleDragOver(event)}
                        onDrop={(event) => handleDrop(event, 'favourite')}
                    >
                        <div className='fs-4 fw-bold text-center py-2'>Favourites</div>
                        <div className='d-flex flex-column gap-2'>
                            {favouriteList.map((item, index) => {
                                return (
                                    <div key={index} className="bg-white overflow-hidden p-1 rounded-3 border shadow-sm cursor-move"
                                        draggable
                                        onDragStart={(event) => handleDragStart(event, item)}
                                    >
                                        <div className='d-flex flex-column'>
                                            <FavouriteItemContent item={item} />
                                            <button onClick={() => handleRemoveFavourite(item)} className='btn btn-sm btn-danger m-1'>Remove from Favourite</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;

//      container-xl: Provides a responsive fixed-width container, extra large.
//      py-2: Adds padding of size 2 (around 0.5rem) to the top and bottom of an element.
//      border: Adds a border to an element.
//      border-primary: Colors the border with the primary theme color.
//      rounded-2: Applies a moderate rounding to the corners of an element.
//      d-flex: Applies the Flexbox layout, enabling flexible and efficient arrangement of items.
//      align-items-center: Vertically aligns flex items in the center.
//      justify-content-between: Distributes space between flex items.
//      px-2: Adds horizontal padding (left and right) of size 2 (around 0.5rem) to an element.
//      img-fluid: Makes an image responsive by scaling it within its parent element.
//      d-none: Hides an element.
//      d-md-block: Displays an element as a block on medium devices and larger.
//      text-center: Centers text horizontally.
//      flex-column: Stacks flex items vertically.
//      gap-1: Adds a gap (spacing) of size 1 (around 0.25rem) between flex/grid items.
//      flex-shrink-1: Allows a flex item to shrink if necessary.
//      text-primary: Colors the text with the primary theme color.
//      re-fs-12: Inside the index.css 
//      fw-medium: Sets the font weight to medium.
