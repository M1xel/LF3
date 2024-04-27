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



  let netzAddressen: number[] = Array.from({ length: 16 }, (_, i) => i);
  let broadcastAddressen: number[] = Array.from({ length: 16 }, (_, i) => i);

  //Get all nessesary Information about the given IP Address and Space
  if (isValidIp(ipAddress)) {
    const result = IPSubnetCalculator.calculateSubnetMask(ipAddress, cidr);

    if (result) {
      const { ipLowStr, ipHighStr, ipLow, ipHigh, prefixSize, prefixMaskStr } =
        result;

      let i;
      let newIpHigh = ipLow;


      for (i = 0; i < amountNetworks; i++) {
        //Probably not needed as ip address have to be 0 at the end (most likely)
        if (i === 0) newIpHigh = ipLow;
        const hosts = networks[i].number;

        //[DEBUG] Test output
        console.log(i, ": Netz Addressen: ", IPSubnetCalculator.toString(newIpHigh));
        netzAddressen[i] = newIpHigh;

        //yeah just dont ask anymore about this
        if (hosts > 0 && hosts < 2) {
          newIpHigh += 2;
        } else if (hosts > 1 && hosts < 4) {
          newIpHigh += 4;
        } else if (hosts > 3 && hosts < 8) {
          newIpHigh += 8;
        } else if (hosts > 7 && hosts < 16) {
          newIpHigh += 16;
        } else if (hosts > 15 && hosts < 32) {
          newIpHigh += 32;
       } else if (hosts > 31 && hosts < 64) {
          newIpHigh += 64;
        } else if (hosts > 63 && hosts < 128) {
          newIpHigh += 128;
        } else if (hosts > 127 && hosts < 256) {
          newIpHigh += 256;
        }

        //[DEBUG] Test output
        console.log(i, ": Broadcast Address: ", IPSubnetCalculator.toString(newIpHigh-1));
        broadcastAddressen[i] = newIpHigh-1;

      }
      console.log(newIpHigh, IPSubnetCalculator.toString(newIpHigh));
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
        <div>
          <table>
            <thead>
              <tr>
                <th>Network</th>
                <th>Netz Address</th>
                <th>Broadcast Address</th>
                <th>Nutzbare IP-Addressen</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: amountNetworks }).map((_, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{IPSubnetCalculator.toString(netzAddressen[i])}</td>
                    <td>{IPSubnetCalculator.toString(broadcastAddressen[i])}</td>
                    <td>
                      {isValidIp(IPSubnetCalculator.toString(netzAddressen[i])) && netzAddressen[i] > 0 && isValidIp(IPSubnetCalculator.toString(broadcastAddressen[i])) && broadcastAddressen[i] > 0 
                        ? `${IPSubnetCalculator.toString(netzAddressen[i]+1)}-${IPSubnetCalculator.toString(broadcastAddressen[i]-1)}` 
                        : "Invalid IP"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
