// This file is a part of the protochan project.
// https://github.com/sidmani/protochan
// https://www.sidmani.com/?postid=3

// Copyright (c) 2016 Quantum Explorer
// Modifications (c) 2018 Sid Mani
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

var op = require('./op');
var h = require('./helper');

var AES0 = h.bytes2Int32Buffer(h.b64Decode("pWNjxoR8fPiZd3fujXt79g3y8v+9a2vWsW9v3lTFxZFQMDBgAwEBAqlnZ859KytWGf7+52LX17Xmq6tNmnZ27EXKyo+dgoIfQMnJiYd9ffoV+vrv61lZsslHR44L8PD77K2tQWfU1LP9oqJf6q+vRb+cnCP3pKRTlnJy5FvAwJvCt7d1HP394a6Tkz1qJiZMWjY2bEE/P34C9/f1T8zMg1w0NGj0paVRNOXl0Qjx8fmTcXHic9jYq1MxMWI/FRUqDAQECFLHx5VlIyNGXsPDnSgYGDChlpY3DwUFCrWami8JBwcONhISJJuAgBs94uLfJuvrzWknJ07NsrJ/n3V16hsJCRKeg4MddCwsWC4aGjQtGxs2sm5u3O5aWrT7oKBb9lJSpE07O3Zh1ta3zrOzfXspKVI+4+PdcS8vXpeEhBP1U1OmaNHRuQAAAAAs7e3BYCAgQB/8/OPIsbF57Vtbtr5qatRGy8uN2b6+Z0s5OXLeSkqU1ExMmOhYWLBKz8+Fa9DQuyrv78XlqqpPFvv77cVDQ4bXTU2aVTMzZpSFhRHPRUWKEPn56QYCAgSBf3/+8FBQoEQ8PHi6n58l46ioS/NRUaL+o6NdwEBAgIqPjwWtkpI/vJ2dIUg4OHAE9fXx37y8Y8G2tnd12tqvYyEhQjAQECAa///lDvPz/W3S0r9Mzc2BFAwMGDUTEyYv7OzD4V9fvqKXlzXMRESIORcXLlfExJPyp6dVgn5+/Ec9PXqsZGTI511duisZGTKVc3PmoGBgwJiBgRnRT0+ef9zco2YiIkR+KipUq5CQO4OIiAvKRkaMKe7ux9O4uGs8FBQoed7ep+JeXrwdCwsWdtvbrTvg4NtWMjJkTjo6dB4KChTbSUmSCgYGDGwkJEjkXFy4XcLCn27T073vrKxDpmJixKiRkTmklZUxN+Tk04t5efIy5+fVQ8jIi1k3N263bW3ajI2NAWTV1bHSTk6c4KmpSbRsbNj6VlasB/T08yXq6s+vZWXKjnp69OmurkcYCAgQ1bq6b4h4ePBvJSVKci4uXCQcHDjxpqZXx7S0c1HGxpcj6OjLfN3doZx0dOghHx8+3UtLlty9vWGGi4sNhYqKD5BwcOBCPj58xLW1capmZszYSEiQBQMDBgH29vcSDg4co2Fhwl81NWr5V1eu0Lm5aZGGhhdYwcGZJx0dOrmenic44eHZE/j467OYmCszEREiu2lp0nDZ2amJjo4Hp5SUM7abmy0iHh48koeHFSDp6clJzs6H/1VVqngoKFB639+lj4yMA/ihoVmAiYkJFw0NGtq/v2Ux5ubXxkJChLhoaNDDQUGCsJmZKXctLVoRDw8ey7Cwe/xUVKjWu7ttOhYWLA=="));
var AES1 = h.bytes2Int32Buffer(h.b64Decode("Y2PGpXx8+IR3d+6Ze3v2jfLy/w1ra9a9b2/escXFkVQwMGBQAQECA2dnzqkrK1Z9/v7nGdfXtWKrq03mdnbsmsrKj0WCgh+dycmJQH19+of6+u8VWVmy60dHjsnw8PsLra1B7NTUs2eiol/9r69F6pycI7+kpFP3cnLklsDAm1u3t3XC/f3hHJOTPa4mJkxqNjZsWj8/fkH39/UCzMyDTzQ0aFylpVH05eXRNPHx+QhxceKT2NirczExYlMVFSo/BAQIDMfHlVIjI0Zlw8OdXhgYMCiWljehBQUKD5qaL7UHBw4JEhIkNoCAG5vi4t896+vNJicnTmmysn/NdXXqnwkJEhuDgx2eLCxYdBoaNC4bGzYtbm7cslpatO6goFv7UlKk9js7dk3W1rdhs7N9zikpUnvj490+Ly9ecYSEE5dTU6b10dG5aAAAAADt7cEsICBAYPz84x+xsXnIW1u27Wpq1L7Ly41Gvr5n2Tk5cktKSpTeTEyY1FhYsOjPz4VK0NC7a+/vxSqqqk/l+/vtFkNDhsVNTZrXMzNmVYWFEZRFRYrP+fnpEAICBAZ/f/6BUFCg8Dw8eESfnyW6qKhL41FRovOjo13+QECAwI+PBYqSkj+tnZ0hvDg4cEj19fEEvLxj37a2d8Ha2q91ISFCYxAQIDD//+Ua8/P9DtLSv23NzYFMDAwYFBMTJjXs7MMvX1++4ZeXNaJERIjMFxcuOcTEk1enp1Xyfn78gj09ekdkZMisXV265xkZMitzc+aVYGDAoIGBGZhPT57R3NyjfyIiRGYqKlR+kJA7q4iIC4NGRozK7u7HKbi4a9MUFCg83t6neV5evOILCxYd29utduDg2zsyMmRWOjp0TgoKFB5JSZLbBgYMCiQkSGxcXLjkwsKfXdPTvW6srEPvYmLEppGROaiVlTGk5OTTN3l58ovn59UyyMiLQzc3blltbdq3jY0BjNXVsWROTpzSqalJ4Gxs2LRWVqz69PTzB+rqzyVlZcqvenr0jq6uR+kICBAYurpv1Xh48IglJUpvLi5cchwcOCSmplfxtLRzx8bGl1Ho6Msj3d2hfHR06JwfHz4hS0uW3b29YdyLiw2GiooPhXBw4JA+PnxCtbVxxGZmzKpISJDYAwMGBfb29wEODhwSYWHCozU1al9XV675ublp0IaGF5HBwZlYHR06J56eJ7nh4dk4+PjrE5iYK7MRESIzaWnSu9nZqXCOjgeJlJQzp5ubLbYeHjwih4cVkunpySDOzodJVVWq/ygoUHjf36V6jIwDj6GhWfiJiQmADQ0aF7+/Zdrm5tcxQkKExmho0LhBQYLDmZkpsC0tWncPDx4RsLB7y1RUqPy7u23WFhYsOg=="));
var AES2 = h.bytes2Int32Buffer(h.b64Decode("Y8alY3z4hHx37pl3e/aNe/L/DfJr1r1rb96xb8WRVMUwYFAwAQIDAWfOqWcrVn0r/ucZ/te1YterTearduyadsqPRcqCH52CyYlAyX36h3367xX6WbLrWUeOyUfw+wvwrUHsrdSzZ9SiX/2ir0Xqr5wjv5ykU/ekcuSWcsCbW8C3dcK3/eEc/ZM9rpMmTGomNmxaNj9+QT/39QL3zINPzDRoXDSlUfSl5dE05fH5CPFx4pNx2Ktz2DFiUzEVKj8VBAgMBMeVUscjRmUjw51ewxgwKBiWN6GWBQoPBZovtZoHDgkHEiQ2EoAbm4Di3z3i680m6ydOaSeyf82ydeqfdQkSGwmDHZ6DLFh0LBo0LhobNi0bbtyyblq07lqgW/ugUqT2Ujt2TTvWt2HWs33OsylSeynj3T7jL15xL4QTl4RTpvVT0blo0QAAAADtwSztIEBgIPzjH/yxecixW7btW2rUvmrLjUbLvmfZvjlySzlKlN5KTJjUTFiw6FjPhUrP0Ltr0O/FKu+qT+Wq++0W+0OGxUNNmtdNM2ZVM4URlIVFis9F+ekQ+QIEBgJ//oF/UKDwUDx4RDyfJbqfqEvjqFGi81GjXf6jQIDAQI8Fio+SP62SnSG8nThwSDj18QT1vGPfvLZ3wbbar3XaIUJjIRAgMBD/5Rr/8/0O89K/bdLNgUzNDBgUDBMmNRPswy/sX77hX5c1opdEiMxEFy45F8STV8SnVfKnfvyCfj16Rz1kyKxkXbrnXRkyKxlz5pVzYMCgYIEZmIFPntFP3KN/3CJEZiIqVH4qkDurkIgLg4hGjMpG7scp7rhr07gUKDwU3qd53l684l4LFh0L26122+DbO+AyZFYyOnROOgoUHgpJkttJBgwKBiRIbCRcuORcwp9dwtO9btOsQ++sYsSmYpE5qJGVMaSV5NM35Hnyi3nn1TLnyItDyDduWTdt2rdtjQGMjdWxZNVOnNJOqUngqWzYtGxWrPpW9PMH9OrPJeplyq9levSOeq5H6a4IEBgIum/VunjwiHglSm8lLlxyLhw4JBymV/GmtHPHtMaXUcboyyPo3aF83XTonHQfPiEfS5bdS71h3L2LDYaLig+FinDgkHA+fEI+tXHEtWbMqmZIkNhIAwYFA/b3AfYOHBIOYcKjYTVqXzVXrvlXuWnQuYYXkYbBmVjBHTonHZ4nuZ7h2Tjh+OsT+Jgrs5gRIjMRadK7admpcNmOB4mOlDOnlJsttpsePCIehxWSh+nJIOnOh0nOVar/VShQeCjfpXrfjAOPjKFZ+KGJCYCJDRoXDb9l2r/m1zHmQoTGQmjQuGhBgsNBmSmwmS1ady0PHhEPsHvLsFSo/FS7bda7Fiw6Fg=="));
var AES3 = h.bytes2Int32Buffer(h.b64Decode("xqVjY/iEfHzumXd39o17e/8N8vLWvWtr3rFvb5FUxcVgUDAwAgMBAc6pZ2dWfSsr5xn+/rVi19dN5qur7Jp2do9FysofnYKCiUDJyfqHfX3vFfr6sutZWY7JR0f7C/DwQeytrbNn1NRf/aKiReqvryO/nJxT96Sk5JZycptbwMB1wre34Rz9/T2uk5NMaiYmbFo2Nn5BPz/1Avf3g0/MzGhcNDRR9KWl0TTl5fkI8fHik3Fxq3PY2GJTMTEqPxUVCAwEBJVSx8dGZSMjnV7DwzAoGBg3oZaWCg8FBS+1mpoOCQcHJDYSEhubgIDfPeLizSbr605pJyd/zbKy6p91dRIbCQkdnoODWHQsLDQuGho2LRsb3LJubrTuWlpb+6CgpPZSUnZNOzu3YdbWfc6zs1J7KSndPuPjXnEvLxOXhISm9VNTuWjR0QAAAADBLO3tQGAgIOMf/Px5yLGxtu1bW9S+amqNRsvLZ9m+vnJLOTmU3kpKmNRMTLDoWFiFSs/Pu2vQ0MUq7+9P5aqq7Rb7+4bFQ0Oa101NZlUzMxGUhYWKz0VF6RD5+QQGAgL+gX9/oPBQUHhEPDwlup+fS+OoqKLzUVFd/qOjgMBAQAWKj48/rZKSIbydnXBIODjxBPX1Y9+8vHfBtravddraQmMhISAwEBDlGv///Q7z879t0tKBTM3NGBQMDCY1ExPDL+zsvuFfXzWil5eIzERELjkXF5NXxMRV8qen/IJ+fnpHPT3IrGRkuuddXTIrGRnmlXNzwKBgYBmYgYGe0U9Po3/c3ERmIiJUfioqO6uQkAuDiIiMykZGxynu7mvTuLgoPBQUp3ne3rziXl4WHQsLrXbb29s74OBkVjIydE46OhQeCgqS20lJDAoGBkhsJCS45Fxcn13Cwr1u09ND76ysxKZiYjmokZExpJWV0zfk5PKLeXnVMufni0PIyG5ZNzfat21tAYyNjbFk1dWc0k5OSeCpqdi0bGys+lZW8wf09M8l6urKr2Vl9I56ekfprq4QGAgIb9W6uvCIeHhKbyUlXHIuLjgkHBxX8aamc8e0tJdRxsbLI+jooXzd3eicdHQ+IR8flt1LS2Hcvb0NhouLD4WKiuCQcHB8Qj4+ccS1tcyqZmaQ2EhIBgUDA/cB9vYcEg4OwqNhYWpfNTWu+VdXadC5uReRhoaZWMHBOicdHSe5np7ZOOHh6xP4+CuzmJgiMxER0rtpaalw2dkHiY6OM6eUlC22m5s8Ih4eFZKHh8kg6emHSc7Oqv9VVVB4KCilet/fA4+MjFn4oaEJgImJGhcNDWXav7/XMebmhMZCQtC4aGiCw0FBKbCZmVp3LS0eEQ8Pe8uwsKj8VFRt1ru7LDoWFg=="));

module.exports.AES_ROUND_LE = function(X, K, Y) {
    (Y[0]) = AES0[(X[0]) & 0xFF] ^
        AES1[((X[1]) >>> 8) & 0xFF] ^
        AES2[((X[2]) >>> 16) & 0xFF] ^
        AES3[((X[3]) >>> 24) & 0xFF] ^ (K[0]);
    (Y[1]) = AES0[(X[1]) & 0xFF] ^
        AES1[((X[2]) >>> 8) & 0xFF] ^
        AES2[((X[3]) >>> 16) & 0xFF] ^
        AES3[((X[0]) >>> 24) & 0xFF] ^ (K[1]);
    (Y[2]) = AES0[(X[2]) & 0xFF] ^
        AES1[((X[3]) >>> 8) & 0xFF] ^
        AES2[((X[0]) >>> 16) & 0xFF] ^
        AES3[((X[1]) >>> 24) & 0xFF] ^ (K[2]);
    (Y[3]) = AES0[(X[3]) & 0xFF] ^
        AES1[((X[0]) >>> 8) & 0xFF] ^
        AES2[((X[1]) >>> 16) & 0xFF] ^
        AES3[((X[2]) >>> 24) & 0xFF] ^ (K[3]);
}

module.exports.AES_ROUND_NOKEY_LE = function(X, Y) {
    var K = new Array(4);
    op.bufferSet(K, 0, 0, 4);
    this.AES_ROUND_LE(X, K, Y);
}
