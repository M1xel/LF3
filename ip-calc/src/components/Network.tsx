import NumberInput from "./NumberInput";

interface NetworkProps {
  onClose: () => void;
  onChangeHosts: (value: number) => void;
  hosts: number;
}

export default function Network(props: NetworkProps) {
  const { onClose, onChangeHosts, hosts } = props;

  return (
    <div className="border p-4 rounded-xl w-full">
      <div className="flex justify-between w-full">
        <div>
          <div>Hosts</div>
          <NumberInput value={hosts} onChange={(v) => onChangeHosts(v)} />
        </div>
        <button onClick={() => onClose()}>Delete</button>
      </div>
    </div>
  );
}
