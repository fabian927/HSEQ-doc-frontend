import React, { useEffect, useRef, useState } from 'react';
import { data } from '/src/assets/ImageSlide.js';
import styled from 'styled-components';

const SliderApp = () => {
    const listRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const timeoutRef = useRef(null);
    
    useEffect(() => {
        const listNode = listRef.current;
        const imgNode = listNode.querySelectorAll("li > img")[currentIndex];

        if (imgNode) {
            imgNode.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });
        }
    }, [currentIndex]);


    useEffect(() => {
        if (isAutoPlay) {
            timeoutRef.current = setTimeout(() => {
                goToNext();
            }, 5000);
        }
        
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentIndex, isAutoPlay]);

    const goToPrevious = () => {
        setCurrentIndex(prev => 
            prev === 0 ? data.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex(prev => 
            prev === data.length - 1 ? 0 : prev + 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <Container>
            <SliderContainer>
                <ContainerImage>
                    <SliderList ref={listRef}>
                        {data.map((item) => (
                            <SliderItem key={item.id}>
                                <img 
                                    src={item.imgUrl} 
                                    alt={`Slide ${item.id}`}
                                    width={500} 
                                    height={280} 
                                />
                            </SliderItem>
                        ))}
                    </SliderList>
                </ContainerImage>
                
                <Controls>
                    <ControlButton onClick={goToPrevious}>&#10092;</ControlButton>
                    <ControlButton onClick={goToNext}>&#10093;</ControlButton>
                </Controls>
                
                <DotsContainer>
                    {data.map((_, index) => (
                        <Dot 
                            key={index}
                            active={index === currentIndex}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </DotsContainer>
            </SliderContainer>
        </Container>
    );
}

export default SliderApp;

const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
`;

const SliderContainer = styled.div`
    position: relative;
    height: 350px;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ContainerImage = styled.div`
    width: 100%;
    height: 100%;
`;

const SliderList = styled.ul`
    display: flex;
    height: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const SliderItem = styled.li`
    flex: 0 0 100%;
    scroll-snap-align: start;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Controls = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    padding: 0 16px;
    z-index: 1;
`;

const ControlButton = styled.button`
    background: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(255, 255, 255, 0.9);
    }
`;

const DotsContainer = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 1;
`;

const Dot = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "active",
})
(({active}) => `
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${active ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background: #fff;
        transform: scale(1.2);
    }
`);