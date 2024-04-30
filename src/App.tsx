import { ReactNode, useEffect, useState } from "react";
import * as IPSubnetCalculator from "ip-subnet-calculator";
import IPut from "iput";
import Network from "./Network";
import NumberInput from "./NumberInput";

interface Network {
  id: string;
  hosts: number;
}

export default function App() {
  const [rawAddress, setIPAddress] = useState("");
  const [cidr, setCIDR] = useState(24);

  const [networks, setNetworks] = useState<Network[]>([]);

  const ipAddress = isValidIp(rawAddress) ? rawAddress : null;

  //[DEBUG] Test output
  useEffect(() => {
    console.log(
      IPSubnetCalculator.calculate("192.168.178.0", "192.168.178.255"),
      IPSubnetCalculator.calculate("192.168.1.2", "192.168.1.3")
    );
  }, []);
  //ipLowStr = Netzaddresse
  //ipHighStr = Broadcast
  //prefixSize = CIDR
  //prefixMaskStr = Subnetmask

  //Calculate the Subnetmask
  const subnetmask = isValidIp(rawAddress)
    ? IPSubnetCalculator.calculateSubnetMask(rawAddress, cidr)?.prefixMaskStr
    : null;

  //Check wheter the given IP Address in the Field is valid
  function isValidIp(ip: string) {
    return ip.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/);
  }

  const generate_networks = (start_ip: string) => {
    let network_nodes: ReactNode[] = [];
    let ip = start_ip;

    //Add edge case for CIDR 31/32
    for (const net of networks) {
      let net_cidr = 32;
      while (net_cidr > 0) {
        let hostResult = IPSubnetCalculator.calculateSubnetMask(ip, net_cidr);
        if (!hostResult) break;
        if (net.hosts <= hostResult.ipHigh - hostResult.ipLow - 1) {
          break;
        }
        net_cidr--;
      }

      let network_node = (
        <Network
          key={net.id}
          hosts={net.hosts}
          onClose={() =>
            setNetworks(networks.filter(({ id }) => net.id !== id))
          }
          onChangeHosts={(v) => {
            setNetworks(
              networks.map((network) => {
                if (network.id === net.id) {
                  return { hosts: v, id: network.id };
                }
                return network;
              })
            );
          }}
          cidr={net_cidr}
          ip={ip}
        />
      );
      network_nodes.push(network_node);
      const next_result = IPSubnetCalculator.calculateSubnetMask(ip, net_cidr);
      if (!next_result) break;
      ip = IPSubnetCalculator.toString(next_result.ipHigh + 1);
    }
    return network_nodes;
  };

  return (
    <main className="flex min-h-screen flex-col p-8">
      <div>
        <div>IP Address</div>
        <div className="flex items-center">
          <IPut onChange={setIPAddress} className="mr-2" />
          <span className="mr-2">/</span>
          <NumberInput onChange={setCIDR} value={cidr} max={32} />
        </div>
        <div>Subnetmask:</div>
        <div>{subnetmask}</div>
        <div className="border p-4 flex flex-col gap-4 rounded-xl">
          {ipAddress ? (
            generate_networks(ipAddress)
          ) : (
            <div>Invalid IP Adress</div>
          )}
          <button
            className="w-full border"
            onClick={() =>
              setNetworks([...networks, { hosts: 0, id: crypto.randomUUID() }])
            }
          >
            Add Network
          </button>
        </div>
      </div>
    </main>
  );
}
