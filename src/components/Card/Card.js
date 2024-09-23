import React from 'react';
import './Card.scss';

function Card({ desktop, name, category, price, onAddToCart, isSelected, onCardClick, quantity, onQuantityChange, mobile, tablet }) {
    const cardClass = isSelected ? 'card selected' : 'card';

    return (
        <div className={cardClass} onClick={onCardClick}>
            <picture>
                <source media="(max-width: 600px)" srcSet={mobile} />
                <source media="(max-width: 1024px)" srcSet={tablet} />
                <img className='thumb' src={desktop} alt={name} />
            </picture>
            <p>{category}</p>
            <h3>{name}</h3>
            <span className='price'>${price.toFixed(2)}</span>

            {isSelected ? (
                <div className='quantity-controls'>
                    <button onClick={(e) => { e.stopPropagation(); onQuantityChange(-1); }}>-</button>
                    <span>{quantity}</span>
                    <button onClick={(e) => { e.stopPropagation(); onQuantityChange(1); }}>+</button>
                </div>
            ) : (
                <span className='hover-cart' onClick={(e) => { e.stopPropagation(); onAddToCart(); }}>
                    <img src={'/icon-add-to-cart.svg'} alt='cart icon' /> Add to Cart
                </span>
            )}
        </div>
    );
}

export default Card;
