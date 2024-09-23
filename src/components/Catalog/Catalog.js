import React, { useState } from 'react';
import Card from '../Card/Card';
import Cart from '../Cart/Cart';
import './Catalog.scss';
import data from '../../source/data.json';

function Catalog() {
    const [cartItems, setCartItems] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]); // Cards selecionados
    const [quantities, setQuantities] = useState({}); // Quantidade de cada item

    const updateCart = (item, quantity) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);

            if (existingItemIndex >= 0) {
                if (quantity === 0) {
                    return prevItems.filter(cartItem => cartItem.id !== item.id);
                }

                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity = quantity;
                return updatedItems;
            } else if (quantity > 0) {
                return [...prevItems, { ...item, quantity }];
            }

            return prevItems;
        });
    };

    const handleCardClick = (id) => {
        const item = data.find(dessert => dessert.id === id);

        // Alterna a seleção do card
        setSelectedCards((prevSelectedCards) => {
            if (prevSelectedCards.includes(id)) {
                // Se o card já estiver selecionado, desseleciona e remove do carrinho
                updateCart(item, 0); // Remove do carrinho
                return prevSelectedCards.filter(cardId => cardId !== id);
            } else {
                // Se não estiver selecionado, adiciona ao carrinho e seleciona
                updateCart(item, 1); // Adiciona ao carrinho com quantidade inicial 1
                return [...prevSelectedCards, id];
            }
        });

        // Inicializa a quantidade com 1 se não estiver definida
        setQuantities((prev) => ({
            ...prev,
            [id]: prev[id] || 1
        }));
    };

    const handleAddToCart = (item) => {
        if (!selectedCards.includes(item.id)) {
            setSelectedCards((prevSelectedCards) => [...prevSelectedCards, item.id]);
            updateCart(item, 1); // Adiciona ao carrinho com quantidade inicial 1
        }
    };

    const handleQuantityChange = (item, increment) => {
        setQuantities((prev) => {
            const newQuantity = (prev[item.id] || 1) + increment;
            if (newQuantity < 0) return prev;
            updateCart(item, newQuantity);

            // Desselecione o card se a quantidade for 0
            if (newQuantity === 0) {
                setSelectedCards((prevSelectedCards) => prevSelectedCards.filter(id => id !== item.id));
            }
            return {
                ...prev,
                [item.id]: newQuantity
            };
        });
    };

    const handleRemoveItem = (itemId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
        setSelectedCards((prevSelectedCards) => prevSelectedCards.filter(id => id !== itemId)); // Remove da seleção
        setQuantities((prev) => {
            const newQuantities = { ...prev };
            delete newQuantities[itemId]; // Remove a quantidade do item removido
            return newQuantities;
        });
    };

    function handleClearCart() {
        setCartItems([]);       // Limpa todos os itens do carrinho
        setSelectedCards([]);   // Desmarca todas as seleções
        setQuantities({});      // Reseta as quantidades
    }

    return (
        <div>
            <h1>Desserts</h1>
            <div className='content'>
                <div className='content-cards'>
                    {data.map((item) => (
                        <Card
                            key={item.id}
                            desktop={item.image.desktop}
                            tablet={item.image.tablet}
                            mobile={item.image.mobile}
                            thumbnail={item.image.thumbnail}
                            name={item.name}
                            category={item.category}
                            price={item.price}
                            onAddToCart={() => handleAddToCart(item)} // Adiciona ao carrinho e seleciona
                            isSelected={selectedCards.includes(item.id)} // Verifica se o card está selecionado
                            onCardClick={() => handleCardClick(item.id)} // Seleciona ou desseleciona o card
                            quantity={quantities[item.id] || 1}
                            onQuantityChange={(increment) => handleQuantityChange(item, increment)}
                            onClearCart={handleClearCart} // Passa a função para limpar o carrinho
                        />
                    ))}
                </div>
                <Cart items={cartItems} onRemoveItem={handleRemoveItem} onClearCart={handleClearCart} />
            </div>
        </div>
    );
}

export default Catalog;
