import NumberInput from "./NumberInput";
import * as IPSubnetCalculator from "ip-subnet-calculator";

interface NetworkProps {
  onClose: () => void;
  onChangeHosts: (value: number) => void;
  hosts: number;
  cidr: number;
  ip: string | null;
}

export default function Network(props: NetworkProps) {
  const { onClose, onChangeHosts, hosts, ip, cidr } = props;

  if (!ip) return <div>Please enter a valid IP address.</div>;

  const result = ip ? IPSubnetCalculator.calculateSubnetMask(ip, cidr) : null;

  return (
    <div className="border p-4 rounded-xl w-full">
      <div className="flex justify-between w-full pb-2 border-b">
        <div>
          <div>Hosts</div>
          <NumberInput value={hosts} onChange={(v) => onChangeHosts(v)} />
        </div>
        <button onClick={() => onClose()}>Delete</button>
      </div>
      {ip && result ? (
        <div>
          <div className="grid grid-cols-3">
            <div>
              <div className="font-semibold">Network Address</div>
              <div>{result.ipLowStr}</div>
            </div>
            <div>
              <div className="font-semibold">CIDR</div>
              <div>/{cidr}</div>
            </div>
            <div>
              <div className="font-semibold">Broadcast Address</div>
              <div>{result.ipHighStr}</div>
            </div>
            <div>
              <div className="font-semibold">Usable Range</div>
              <div>
                {`${IPSubnetCalculator.toString(
                  result.ipLow + 1
                )} - ${IPSubnetCalculator.toString(result.ipHigh - 1)}`}
              </div>
            </div>
            <div>
              <div className="font-semibold">Usable Adresses</div>
              <div>{result.ipHigh - result.ipLow - 1}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>Invalid IP Address</div>
      )}
    </div>
  );
}
