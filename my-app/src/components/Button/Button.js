import { ButtonLoadMore } from "../Button/Button.styled";
import PropTypes from "prop-types";
import { Container } from "../../Style/Container.styled";

const Button = ({ onLoadMore }) => (
  <Container>
    <ButtonLoadMore type="button" onClick={onLoadMore}>
      Load more
    </ButtonLoadMore>
  </Container>
);

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
export default Button;
