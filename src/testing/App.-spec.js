import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  let wrapper;
  let history = {};
  beforeEach(() => {
    wrapper =
      shallow(<App history={history}/>)
  })

  it('has a Router component', () => {
    expect(wrapper.find('Router'))
      .to.have.length(1);
  });

  it('passes a history prop', () => {
    const props = wrapper.find('Router').props();

    expect(props.history).to.be.defined})
    
    it('renders learn react link', () => {
      render(<App />);
      const linkElement = screen.getByText(/learn react/i);
      expect(linkElement).toBeInTheDocument();
    });
    
});
