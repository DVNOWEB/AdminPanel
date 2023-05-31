import { render, screen } from '@testing-library/react'
import Home from '../Home'
import '@testing-library/jest-dom/extend-expect'

describe('Home', () => {
  it('renders without errors', () => {
    render(<Home />)
    const homeElement = screen.getByText('Welcome to the Admin Panel')
    expect(homeElement).toBeInTheDocument() 
    expect(homeElement.tagName).toMatch(/h\d/i) 
    expect(
      screen.getByText('To continue please register as admin or login')
    ).toBeInTheDocument()
  })
})
