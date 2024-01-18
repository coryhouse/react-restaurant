type InputProps = {
  value: string;
  label: string;
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export function Input(props: InputProps) {
  return (
    <>
      <label htmlFor={props.id} className="block">
        {props.label}
      </label>
      <input
        id={props.id}
        type="text"
        className="border-2 border-gray-400"
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
}
