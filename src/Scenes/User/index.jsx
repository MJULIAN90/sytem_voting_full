import React from "react";
import FormUser from "../../components/Form";

const User = (props) => {
  const {
    participateCandidate,
    isExistWinner
  } = props;

  return (
    <div >
      <FormUser action={participateCandidate} isExistWinner={isExistWinner} />
    </div>)
};

export default User;