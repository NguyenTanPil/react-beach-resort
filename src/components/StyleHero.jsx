import styled from 'styled-components';

import defaultImg from '../images/room-1.jpeg';

const StyleHero = styled.header`
  background: url(${(props) => (props.img ? props.img : defaultImg)})
    center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

export default StyleHero;
