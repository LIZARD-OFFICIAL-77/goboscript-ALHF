# ALHF

ALHF (**a**wesome-**l**lama **h**ierarchial **f**ormat) is an implementation of [awesome-llama's scratch object format](https://github.com/awesome-llama/scratch-object-format/wiki/Format-Specifications) in goboscript with extra functions to serialize or deserialize objects.

# Usage

First copy the file to your project

```sh
curl -fo src/ALHF.gs https://raw.githubusercontent.com/LIZARD-OFFICIAL-77/goboscript-ALHF/refs/heads/main/ALHF.gs
```

# Examples

## Deserializing ALHF

```goboscript
list ALHF "example-ALHF.txt";

ALHF_DESERIALIZE(ALHF[1]);
```

## Get and set path

```goboscript
let ALHF_GET_PATH
```

If the path you called get on contains an array, it will return "\<array>", and the array will be contained in \_\_ALHF_RETURN_ARRAY__