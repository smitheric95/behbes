Vagrant.configure("2") do |config|
    # Base VM
    config.vm.box = "bento/ubuntu-16.04"
    config.vm.provider :virtualbox do |p|
        p.customize ['modifyvm', :id, '--memory', '2048']
    end

    # Use the script above to provision the VM
    config.vm.provision "shell", path: "bootstrap.sh"

    # Set up private networking
    config.vm.network "private_network", ip: "192.168.50.4"
    config.vm.network "forwarded_port", guest: 80, host: 5000
    config.vm.network "forwarded_port", guest: 8100, host: 8100
end
