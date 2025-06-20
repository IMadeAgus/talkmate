"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { countrys } from "@/constants";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const CountryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("country") || "";

  const [country, setcountry] = useState(query);

  useEffect(() => {
    let newUrl = "";
    if (country === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["country"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "country",
        value: country,
      });
    }
    router.push(newUrl, { scroll: false });
  }, [country]);

  return (
    <Select onValueChange={setcountry} value={country}>
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All countrys</SelectItem>
        {countrys.map((country) => (
          <SelectItem key={country} value={country} className="capitalize">
            {country}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountryFilter;
