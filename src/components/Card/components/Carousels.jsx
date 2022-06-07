import Carousel from "react-spring-3d-carousel";
import { useState } from "react";
import { config } from "react-spring";
import Card from "..";
import { images } from '../../../Assets'


const  Carousels = (props)=> {
    const {listCandidate, isExistWinner} = props
    const [goToSlide, setGoToSlide] = useState(null);

    let cardsPrepare = [
        {
            key: 1,
            content: (
                <Card imagen={images.interrogacion} {...props} item={listCandidate[0]} isExistWinner={isExistWinner}/>
            )
        },
        {
            key: 2,
            content: (
                <Card imagen={images.interrogacion} {...props} item={listCandidate[1]} isExistWinner={isExistWinner}/>
            )
        },
        {
            key: 3,
            content: (
                <Card imagen={images.interrogacion} {...props} item={listCandidate[2]} isExistWinner={isExistWinner}/>
            )
        },
        {
            key: 4,
            content: (
                <Card imagen={images.interrogacion} {...props} item={listCandidate[3]} isExistWinner={isExistWinner}/>
            )
        },
        {
            key: 5,
            content: (
                <Card imagen={images.interrogacion} {...props} item={listCandidate[4]} isExistWinner={isExistWinner}/>
            )
        },
    ].map((element, index) => {
        return { ...element, onClick: () => setGoToSlide(index) };
    });

    return (
        <div
            style={{ width: "70%", height: '200px', margin: "0 auto" }}
        >
            <Carousel
                slides={cardsPrepare}
                goToSlide={goToSlide}
                offsetRadius={2}
                showNavigation={false}
                animationConfig={config.gentle}
            />
        </div>
    );
}

export default Carousels;