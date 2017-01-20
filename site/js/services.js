angular.module('app.services', [])
    .factory('funcs', function() {
        var ret = {};
        ret.parsePhone = function(tel) {
            //var cc = '0098';
            tel = tel.toString();
            tel = tel.split('+').join('00');
            tel = tel.replace(/[^\/\d]/g, '');
            if (tel == '') return false;
            if (tel.substr(0, 1) == '0' && tel.substr(1, 1) != '0') { // like 0912
                tel = tel;
            }
            if (tel.substr(0, 1) != '0') { // like 912
                tel = '0' + tel;
            }
            if (tel.substr(0, 2) == '00') { // like 0098912
                tel = '0' + tel.substr(4);
            }
            var reg = /(09)(\d{9})$/;
            if (reg.test(tel) !== true) {
                return false;
            }
            return tel;
        }
        ret.address = serverConfig.address + ':' + serverConfig.port;
        return ret;
    })
    .filter('parsePhone', function(funcs) {
        return funcs.parsePhone;
    })
    .filter('pDate', function() {
        return function(dt) {
            var ret = moment(dt).format('jD jMMMM jYY ساعت HH:MM');
            ret = ret
                .replace('Farvardin', 'فروردین')
                .replace('Ordibehesht', 'اردیبهشت')
                .replace('Khordad', 'خرداد')
                .replace('Tir', 'تیر')
                .replace('Amordaad', 'مرداد')
                .replace('Shahrivar', 'شهریور')
                .replace('Mehr', 'مهر')
                .replace('Aaban', 'آبان')
                .replace('Aazar', 'آذر')
                .replace('Dey', 'دی')
                .replace('Bahman', 'بهمن')
                .replace('Esfand', 'اسفند');
            return ret;
        }
    })
