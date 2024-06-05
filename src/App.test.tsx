import { screen } from '@testing-library/react';
import { render } from '../test/test-utilities';
import { App } from './App';
import { describe, it, expect, vi } from 'vitest';

vi.mock('./components/Header', () => ({ default: () => <div>Header</div> }));
vi.mock('./components/Footer', () => ({ default: () => <div>Footer</div> }));
vi.mock('./pages/Login', () => ({ default: () => <div>Login</div> }));
vi.mock('./pages/Registration', () => ({ default: () => <div>Registration</div> }));
vi.mock('./pages/Profile', () => ({ default: () => <div>Profile</div> }));
vi.mock('./pages/Catalog', () => ({ default: () => <div>Catalog</div> }));
vi.mock('./pages/NotFoundPage', () => ({ default: () => <div>NotFoundPage</div> }));

describe('App Routing', () => {
  it('should redirect to the Catalog page on "/login" route when logged in', () => {
    render(<App />, { route: '/login' });
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  it('should render the Registration page on "/registration" route when not logged in', () => {
    render(<App />, { route: '/registration' });
    expect(screen.getByText('Registration')).toBeInTheDocument();
  });

  it('should redirect to the Catalog page on "/registration" route when logged in', () => {
    render(<App />, { route: '/registration' });
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });
});
