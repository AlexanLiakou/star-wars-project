import { BarLoader } from "react-spinners";

const override = {
  display: 'block',
  margin: '0 auto 50px auto'
}

const Spinner = ({color='var(--color-star-blue)', width="200px"}) => {
  return (
    <div>
      <BarLoader color={color} width={width} cssOverride={override} aria-label="Loading..."/>
    </div>
  );
}

export default Spinner;