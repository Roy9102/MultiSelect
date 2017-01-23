# MultiSelect

## Example

```
    <MultipleSelect onChange = { this.handleChange } defaultValue = {value}>
        <Option value = "A" >optionA</Option>
        <Option value = "B" >optionB</Option>
    </MultipleSelect>
```

## API

| var | description | type | required |
| ------| ------ | ------ | ------ |
| multiple | isMultiple | bool | false, default: true |
| defaultValue | defaultValue | string | false, default: '' |
| onChange | value on change | func | true |
