import PropTypes from "prop-types";

export default PropTypes.shape({
  clientName: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  services: PropTypes.array.isRequired,
  time: PropTypes.string.isRequired,
});
