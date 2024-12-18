type UserProps = {
  user: {
    name: string;
    username: string;
    email: string;
    password: string;
  };
};

export default function User({ user }: UserProps) {
  return (
    <div>
      <h2>Name: {user.name}</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
