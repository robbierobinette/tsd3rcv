topojson > us2018.topo.json \
    -q 50000 \
    -s 0.00000001 \
        states=cb_2018_us_state_500k/cb_2018_us_state_500k.shp \
            --id-property GEOID \
        districts=cb_2018_us_cd116_500k/cb_2018_us_cd116_500k.shp \
            --id-property GEOID \
        counties=cb_2018_us_county_500k/cb_2018_us_county_500k.shp \
            --id-property GEOID
