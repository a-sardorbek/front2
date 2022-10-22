import FormControlLabel from "@mui/material/FormControlLabel";
import { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { Card } from "@mui/material";
import "./cities.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCities } from "../../../Redux/super_admin/cities_jobs";
import { editCities } from "../../../Redux/both/user";
import {
  errorNotification,
  successNotification,
} from "../../../Helpers/notification";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Cities = () => {
  const cities = useSelector((state) => state.cities_jobs.cities.data);
  const uniqueIds = [];

  const uniqueEmployees = cities.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.addressName);

    if (!isDuplicate) {
      uniqueIds.push(element.addressName);

      return true;
    }

    return false;
  });

  const dispatch = useDispatch();

  const [checkCities, setCheckCities] = useState([]);
  const all_cities = [];

  useEffect(() => {
    for (let i = 0; i < checkCities.length; i++) {
      cities.filter((city) => {
        if (city.id === checkCities[i]) {
          if (!all_cities.includes(city)) {
            all_cities.push({
              id: city.id,
              addressName: city.addressName,
              status: true,
            });
          }
        }
      });
    }
  }, [checkCities]);

  const handleCities = () => {
    dispatch(editCities(all_cities))
      .unwrap()
      .then(() => {
        successNotification("bottomRight", "Muvofaqqiyatli ozgardi");
        dispatch(getAllCities());
      })
      .catch((err) => {
        errorNotification("bottomRight", err);
      });
  };

  const handleChange1 = (isChecked) => {
    if (isChecked) return setCheckCities(cities.map((city) => city.id));
    else setCheckCities([]);
  };

  const handleChange2 = (isChecked, id) => {
    const index = checkCities.indexOf(id);

    if (isChecked) return setCheckCities((state) => [...state, id]);

    if (!isChecked && index > -1)
      return setCheckCities((state) => {
        state.splice(index, 1);
        return JSON.parse(JSON.stringify(state)); // Here's the trick => React does not update the f* state array changes even with the spread operator, the reference is still the same.
      });
  };

  return (
    <div className="all_cities secondary-color">
      <Fragment>
        <FormControlLabel
          label={
            checkCities.length === 0
              ? "Barchasini qo'shish"
              : "Barchasini o'chirish"
          }
          control={
            <Checkbox
              checked={checkCities.length === cities.length}
              indeterminate={
                checkCities.length !== cities.length && checkCities.length > 0
              }
              onChange={(event) => handleChange1(event.target.checked)}
            />
          }
        />
        <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
          {checkCities &&
            uniqueEmployees.map((city) => (
              <FormControlLabel
                label={city.addressName}
                control={
                  <Checkbox
                    key={city.id}
                    checked={checkCities.includes(city.id)}
                    onChange={(event) =>
                      handleChange2(event.target.checked, city.id)
                    }
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
              />
            ))}
        </Box>

        <div className="citySubmitButton">
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={handleCities}>
              Shahar qo'shish
            </Button>
          </Stack>
        </div>
      </Fragment>
    </div>
  );
};

export default Cities;
