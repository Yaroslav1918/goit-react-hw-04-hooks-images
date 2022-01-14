import Loader from "react-loader-spinner";
import { FallBackContainer } from "../../Style/FallBackContainer.styled";

const Spinner = () => (
  <FallBackContainer>
    <Loader
      type="Circles"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000}
    />
  </FallBackContainer>
);

export default Spinner;
