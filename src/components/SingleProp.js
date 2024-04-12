import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropertyDataMain from '../data/PropertyData.json'; 


function SingleProp() {
    // Get the propoerty ID from url
    const { id } = useParams();

    const [propertyData, setPropertyData] = useState();
    const [selectedImgIndex, setSelectedImgIndex] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();

    const handleTabSelect = (index) => {
        setActiveTab(index);
    };

    useEffect(() => {
        // Find the property with the matching id
        const foundProperty = PropertyDataMain.find(property => property.id === id);

        // If the property is found, update the state
        if (foundProperty) {
            setPropertyData(foundProperty);
        } else {
            // Handle case where property with the given id is not found
            // For example, you can navigate to the home page
            navigate('/');
        }
    }, [id, navigate]);


    return (
        <>
            <nav className='container-xl py-2'>
                <div className="border border-primary rounded-2 d-flex align-items-center justify-content-between px-2">
                    <Link to='/'><img className='img-fluid' src="/logo.png" alt="Logo" /></Link>
                </div>
            </nav>

            <div className='container-xl pb-3'>
                {propertyData && <div className="row">
                    <div className="col-md-6 d-flex flex-column gap-2">
                        <div className='p-2'><img className='rounded-3 img-fluid' src={`/images/${propertyData?.picture[selectedImgIndex]}`} alt="property" /></div>
                        <div className="row g-2">
                            {propertyData?.picture?.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => setSelectedImgIndex(index)} className='col-3 col-md-4 col-lg-3 cursor-pointer'>
                                        <img className={`object-fit-cover img-fluid rounded-3 p-1 border border-2 hover-zoom ${selectedImgIndex === index ? 'border-danger' : 'border-white'}`} src={`/images/${item}`} alt="property" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-md-6 p-2">
                        <div className="bg-light shadow-sm rounded-2 p-4">
                            <div className="d-flex flex-column gap-2 fs-5">
                                <div className="fw-semibold fs-2">{propertyData.title}</div>
                                <div className="d-flex align-items-center gap-1">
                                    <i className="fa-solid fa-location-dot"></i>{propertyData.location}
                                </div>
                                <div className='d-flex align-items-center gap-3'>
                                    <div className=""><span className="fw-medium">Type: </span>{propertyData.type}</div>
                                    <div className="d-flex align-items-center gap-2"><span className="fw-medium">Total Bedroom: </span>{propertyData.bedrooms}</div>
                                </div>
                                <div className='d-flex align-items-center gap-3'>
                                    <div className=""><span className="fw-medium">Tenure: </span>{propertyData.tenure}</div>
                                    <div className="d-flex align-items-center gap-2"><span className="fw-medium">Price: </span>${propertyData.price.toLocaleString('en-US')}</div>
                                </div>
                                <div className=""><span className="fw-medium">Added on: </span>{propertyData.added}</div>
                                <Tabs className="mt-4" selectedIndex={activeTab} onSelect={handleTabSelect}>
                                    <TabList className="nav nav-tabs">
                                        <Tab className="nav-item cursor-pointer btn-outline-info">
                                            <div className={`nav-link ${activeTab === 0 ? 'active' : ''}`}>Description</div>
                                        </Tab>
                                        <Tab className="nav-item cursor-pointer btn-outline-info">
                                            <div className={`nav-link ${activeTab === 1 ? 'active' : ''}`}>Floor Plan</div>
                                        </Tab>
                                        <Tab className="nav-item cursor-pointer btn-outline-info">
                                            <div className={`nav-link ${activeTab === 2 ? 'active' : ''}`}>Map</div>
                                        </Tab>
                                    </TabList>
                                    <TabPanel>
                                        <div className="mt-3">{propertyData.description}</div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="mt-3">No Floor Plan available..</div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="mt-3">
                                            <div className="rounded-2 overflow-hidden"><div className="gmap_canvas"><iframe width="100%" height="320" id="gmap_canvas" src={`https://maps.google.com/maps?q=${propertyData.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0" title={propertyData.title}></iframe></div></div>
                                        </div>
                                    </TabPanel>
                                </Tabs>

                            </div>
                        </div>

                    </div>
                </div>}
            </div>
        </>
    );
}

//      container-xl: This class defines a Bootstrap container with extra-large width, providing responsive padding on both sides of its content.
//      py-2: Adds padding on the top and bottom of an element.
//      border border-primary: Applies a border to an element with the primary color.
//      rounded-2: Rounds the corners of an element with a medium degree of curvature.
//      d-flex: Applies flexbox layout, allowing you to align items vertically and justify content horizontally within a container.
//      px-2: Adds horizontal padding to an element.
//      img-fluid: Makes an image responsive, allowing it to scale appropriately within its container.
//      pb-3: Adds bottom padding to an element.
//      col-md-6: Defines a column with a medium breakpoint, creating a responsive layout for different screen sizes.
//      gap-2: Adds vertical spacing (gap) between child elements within a container.
//      rounded-3: Rounds the corners of an element with a higher degree of curvature.
//      bg-light: Sets the background color of an element to a light shade.
//      shadow-sm: Applies a small shadow to create a subtle 3D effect.
//      p-4: Adds padding to the inner content of an element.
//      mt-4: Provides top margin to an element, creating space between the element and its preceding content.
//      nav nav-tabs: Defines a navigation component and styles tabs for tabbed interfaces.

export default SingleProp;
