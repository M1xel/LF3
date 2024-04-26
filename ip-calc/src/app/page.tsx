"use client";
import IPut from "iput";
import { useEffect, useState } from "react";
import * as IPSubnetCalculator from "ip-subnet-calculator";
import NumberInput from "../components/NumberInput";

export default function Home() {
  const [ipAddress, setIPAddress] = useState("");
  const [cidr, setCIDR] = useState(24);
  const [hosts, setHosts] = useState(0);
  const [amountNetworks, setAmountNetworks] = useState(1);

  const [networks, setNetworks] = useState(
    Array.from({ length: 16 }, (_, i) => {
      return {
        number: 0,
      };
    })
  );

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
  const subnetmask = isValidIp(ipAddress)
    ? IPSubnetCalculator.calculateSubnetMask(ipAddress, cidr)?.prefixMaskStr
    : null;

  //Check wheter the given IP Address in the Field is valid
  function isValidIp(ip: string) {
    return ip.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/);
  }

  //Get all nessesary Information about the given IP Address and Space
  if (isValidIp(ipAddress)) {
    const result = IPSubnetCalculator.calculateSubnetMask(ipAddress, cidr);

    if (result) {
      const { ipLowStr, ipHighStr, ipLow, ipHigh, prefixSize, prefixMaskStr } =
        result;
      /*       console.log(
        ipLowStr,
        ipHighStr,
        ipLow,
        ipHigh,
        prefixSize,
        prefixMaskStr
      ); */

      let i;
      for (i = 0; i < amountNetworks; i++) {
        const hosts = networks[i].number;
        console.log(hosts);
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div>IP Address</div>
        <IPut onChange={setIPAddress} />
        <div>{ipAddress}</div>
        <div>CIDR</div>
        <NumberInput onChange={setCIDR} value={cidr} max={32} />
        <div>Subnetmask:</div>
        <div>{subnetmask}</div>
        <div>Amount Networks</div>
        <NumberInput
          onChange={setAmountNetworks}
          value={amountNetworks}
          max={16}
        />
        <div>
          {Array.from({ length: amountNetworks }).map((_, i) => {
            return (
              <div key={i}>
                <div>Hosts: Netz {i + 1}</div>
                <div>
                  <NumberInput
                    value={networks[i].number}
                    onChange={(value) => {
                      setNetworks(
                        networks.map((net, index) => {
                          if (index === i) {
                            return { number: value };
                          }
                          return net;
                        })
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
