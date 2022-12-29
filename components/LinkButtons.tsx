import styled from 'styled-components'

export const LinkButtons = styled.div`
  display: flex;
  gap: 0.75rem;

  a {
    text-decoration: none;
    background: #5e548e;
    padding: 0.5rem;
    border-radius: 12px;
    font-size: 24px;
    transition: all 0.1s ease-in-out;
    font-weight: bold;
  }

  a:hover {
    color: #be95c4;
    box-shadow: 0 5px 15px rgb(94, 84, 142, 0.4);
  }
`
