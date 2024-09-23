import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Catalog from '../src/components/Catalog/Catalog';

jest.mock('../src/source/data.json', () => [
  {
    id: 1,
    name: 'Chocolate Cake',
    category: 'Dessert',
    price: 5.99,
    image: {
      desktop: '/image-desktop.png',
      mobile: '/image-mobile.png',
      tablet: '/image-tablet.png',
      thumbnail: '/image-thumbnail.png',
    },
  },
  {
    id: 2,
    name: 'Cheesecake',
    category: 'Dessert',
    price: 6.99,
    image: {
      desktop: '/image-desktop-2.png',
      mobile: '/image-mobile-2.png',
      tablet: '/image-tablet-2.png',
      thumbnail: '/image-thumbnail-2.png',
    },
  },
]);

describe('Catalog Component', () => {
  it('renders the list of desserts', () => {
    const { getByText } = render(<Catalog />);

    expect(getByText('Chocolate Cake')).toBeInTheDocument();
    expect(getByText('Cheesecake')).toBeInTheDocument();
  });

  it('updates the quantity when the buttons are clicked', () => {
    const { getByText } = render(<Catalog />);

    const card = getByText('Chocolate Cake');
    fireEvent.click(card); // Adiciona ao carrinho

    const incrementButton = getByText('+');
    fireEvent.click(incrementButton);

    const quantity = getByText('2');
    expect(quantity).toBeInTheDocument();
  });
});
