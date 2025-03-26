'use client';
import {Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectLabel, SelectItem} from "@/components/ui/select";
import {useEffect, useState} from "react";
import {getGroups} from "@/server/actions/getGroups";
const GroupSelect = ({ setSelectedGroup = (value) => {} }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const groupsRes = await getGroups();
        if (groupsRes.success) {
          setGroups(groupsRes.data);
        } else {
          console.log(groupsRes.message);
        }
      } catch (e) {
        console.log(e)
      }
    }

    getData();
  }, [])

  return (
    <Select onValueChange={(value) => setSelectedGroup(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Выбрать группу" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Groups</SelectLabel>
          {
            groups.map(el => (
              <SelectItem
                key={el.name}
                value={el.name}
              >
                {el.name}
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default GroupSelect;