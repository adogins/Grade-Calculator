import React from "react";
import User from "./User";

type UsersProps = {
  users: {
    name: string;
    username: string;
    email: string;
    password: string;
  }[];
};

const Users: React.FC<UsersProps> = ({ users }) => {
  return (
    <div>
      <ul>
        {users.map((user) => (
          <User key={user.username} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default Users;
