var __ALHF_SEP__ = "\u2404";

var __ALHF_VALUE__;
var __ALHF_PATH_IDX__;
var __ALHF_ADDR__;
var __ALHF_PATH_ELEM__;
var __ALHF_TYPE__;
var __ALHF_DICT_ADDR__;
var __ALHF_DESERIALIZE_IDX__;
var __ALHF_DESERIALIZE_ELEM__;

list __ALHF_RETURN_ARRAY__;
list __ALHF_PATH__;
list __ALHF_DATA__;

func ALHF_GET_PATH(__ALHF_PATH__) {
    delete __ALHF_PATH__;

    local __ALHF_PATH_ELEM__ = "";
    local __ALHF_PATH_IDX__ = 1;

    repeat length($__ALHF_PATH__) {
        if $__ALHF_PATH__[__ALHF_PATH_IDX__] == "." {
            add __ALHF_PATH_ELEM__ to __ALHF_PATH__;
            __ALHF_PATH_ELEM__ = "";
        }
        else {
            __ALHF_PATH_ELEM__ &= $__ALHF_PATH__[__ALHF_PATH_IDX__];
        }
        __ALHF_PATH_IDX__ += 1;
    }
    if not (__ALHF_PATH_ELEM__ == "") {
        add __ALHF_PATH_ELEM__ to __ALHF_PATH__;
        __ALHF_PATH_ELEM__ = "";
    }

    __ALHF_SEARCH__ 1, 1;

    if __ALHF_DATA__[__ALHF_ADDR__] == "AV" {
        local __LEN_RETURN_ARRAY = __ALHF_DATA__[(__ALHF_ADDR__ + 1)];
        local __I_RETURN_ARRAY = 2;
        
        delete __ALHF_RETURN_ARRAY__;
        
        repeat __LEN_RETURN_ARRAY {
            add __ALHF_DATA__[(__ALHF_ADDR__ + __I_RETURN_ARRAY)] to __ALHF_RETURN_ARRAY__;
            __I_RETURN_ARRAY++;
        }

        return "";
    }

    return __ALHF_DATA__[__ALHF_ADDR__];
}

func ALHF_SERIALIZE() {
    local __ALHF_SERIALIZE_IDX__ = 1;
    local __ALHF_SERIALIZE_RESULT__ = "";

    repeat length __ALHF_DATA__ {
        __ALHF_SERIALIZE_RESULT__ = __ALHF_SERIALIZE_RESULT__ & __ALHF_DATA__[__ALHF_SERIALIZE_IDX__];
        if not(__ALHF_SERIALIZE_IDX__ == length __ALHF_DATA__) {
            __ALHF_SERIALIZE_RESULT__ = __ALHF_SERIALIZE_RESULT__ & __ALHF_SEP__;
        }
        __ALHF_SERIALIZE_IDX__++;
    }
}

proc __ALHF_SEARCH__ __ALHF_PATH_IDX__, __ALHF_ADDR__ {
    local __ALHF_TYPE__ = __ALHF_DATA__[$__ALHF_ADDR__];
    if __ALHF_TYPE__ == "V" {
        __ALHF_ADDR__ = $__ALHF_ADDR__ + 1;
    }
    elif __ALHF_TYPE__ == "P" {
        __ALHF_SEARCH__ $__ALHF_PATH_IDX__, __ALHF_DATA__[$__ALHF_ADDR__ + 1];
    }
    elif $__ALHF_PATH_IDX__ > length(__ALHF_PATH__) {
        __ALHF_ADDR__ = $__ALHF_ADDR__;
    }
    elif __ALHF_TYPE__ == "AV" {
        if round(__ALHF_PATH__[$__ALHF_PATH_IDX__]) < 1 or round(__ALHF_PATH__[$__ALHF_PATH_IDX__]) > __ALHF_DATA__[$__ALHF_ADDR__ + 1] {
            ask "index out of range at " & $__ALHF_ADDR__;
        }
        else {
            __ALHF_ADDR__ = $__ALHF_ADDR__ + (1 + __ALHF_PATH__[$__ALHF_PATH_IDX__]);
        }
    }
    elif __ALHF_TYPE__ == "A" {
        if round(__ALHF_PATH__[$__ALHF_PATH_IDX__]) < 1 or round(__ALHF_PATH__[$__ALHF_PATH_IDX__]) > __ALHF_DATA__[$__ALHF_ADDR__ + 1] {
            ask "index out of range at " & $__ALHF_ADDR__;
        }
        else {
            __ALHF_SEARCH__ $__ALHF_PATH_IDX__ + 1, $__ALHF_ADDR__ + 2 * __ALHF_PATH__[$__ALHF_PATH_IDX__];
        }
    }
    elif __ALHF_TYPE__ == "DV" {
        __ALHF_DICT_ADDR__ = $__ALHF_ADDR__ + 2;
        repeat __ALHF_DATA__[$__ALHF_ADDR__ + 1] {
            if __ALHF_PATH__[$__ALHF_PATH_IDX__] == __ALHF_DATA__[__ALHF_DICT_ADDR__] {
                __ALHF_ADDR__ = __ALHF_DICT_ADDR__ + 1;
                stop_this_script;
            }
            __ALHF_DICT_ADDR__ += 2;
        }
        ask "key not found in DV " & __ALHF_PATH__[$__ALHF_PATH_IDX__];
    }
    elif __ALHF_TYPE__ == "D" {
        __ALHF_DICT_ADDR__ = $__ALHF_ADDR__ + 2;
        repeat __ALHF_DATA__[$__ALHF_ADDR__ + 1] {
            if __ALHF_PATH__[$__ALHF_PATH_IDX__] == __ALHF_DATA__[__ALHF_DICT_ADDR__] {
                __ALHF_SEARCH__ $__ALHF_PATH_IDX__ + 1, __ALHF_DICT_ADDR__ + 1;
                stop_this_script;
            }
            __ALHF_DICT_ADDR__ += 3;
        }
        ask "key not found in D " & __ALHF_PATH__[$__ALHF_PATH_IDX__];
    }
    else {
        ask "__ALHF_DATA__ type unknown at " & __ALHF_ADDR__;
    }
}

proc ALHF_SET_PATH __ALHF_PATH__, __ALHF_VALUE__ {
    delete __ALHF_PATH__;
    
    local __ALHF_PATH_ELEM__ = "";
    local __ALHF_PATH_IDX__ = 1;

    repeat length($__ALHF_PATH__) {
        if $__ALHF_PATH__[__ALHF_PATH_IDX__] == "." {
            add __ALHF_PATH_ELEM__ to __ALHF_PATH__;
            __ALHF_PATH_ELEM__ = "";
        }
        else {
            __ALHF_PATH_ELEM__ &= $__ALHF_PATH__[__ALHF_PATH_IDX__];
        }
        __ALHF_PATH_IDX__ += 1;
    }
    if not (__ALHF_PATH_ELEM__ == "") {
        add __ALHF_PATH_ELEM__ to __ALHF_PATH__;
        __ALHF_PATH_ELEM__ = "";
    }
    __ALHF_VALUE__ = "";
    __ALHF_ADDR__ = "";
    __ALHF_SEARCH__ 1, 1;
    __ALHF_DATA__[__ALHF_ADDR__] = $__ALHF_VALUE__;
}

proc ALHF_DESERIALIZE __ALHF_SERIALIZED_DATA__ {
    delete __ALHF_DATA__;
    
    local __ALHF_DESERIALIZE_ELEM__ = "";
    local __ALHF_DESERIALIZE_IDX__ = 1;

    repeat length($__ALHF_SERIALIZED_DATA__) {
        if $__ALHF_SERIALIZED_DATA__[__ALHF_DESERIALIZE_IDX__] == __ALHF_SEP__ {
            add __ALHF_DESERIALIZE_ELEM__ to __ALHF_DATA__;
            __ALHF_DESERIALIZE_ELEM__ = "";
        }
        else {
            __ALHF_DESERIALIZE_ELEM__ &= $__ALHF_SERIALIZED_DATA__[__ALHF_DESERIALIZE_IDX__];
        }
        __ALHF_DESERIALIZE_IDX__ += 1;
    }
    if not (__ALHF_DESERIALIZE_ELEM__ == "") {
        add __ALHF_DESERIALIZE_ELEM__ to __ALHF_DATA__;
        __ALHF_DESERIALIZE_ELEM__ = "";
    }
}
